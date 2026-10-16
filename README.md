# CondoMais — Gestão de Condomínios

Aplicação web de gestão de condomínios, com backend em Java + Spring Boot e frontend em React. Permite cadastro de moradores e unidades (apartamentos), cadastro de áreas comuns, reserva dessas áreas pelos moradores e publicação de avisos no mural, com dois perfis de acesso: **morador** e **síndico**.

## Sumário

- [Stack](#stack)
- [Pré-requisitos](#pré-requisitos)
- [Como rodar](#como-rodar)
- [Endpoints principais](#endpoints-principais)
- [Fluxos de uso](#fluxos-de-uso)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Modelo de dados](#modelo-de-dados)
- [Estrutura de pacotes](#estrutura-de-pacotes)
- [Débitos técnicos conhecidos](#débitos-técnicos-conhecidos)
- [Autores](#autores)

## Stack

**Backend**

- Java 25
- Spring Boot 4.1.1 (webmvc, security, data-jpa, validation)
- MySQL
- JWT (JJWT 0.12.6) + refresh token
- MapStruct 1.6.3
- Lombok
- Maven

**Frontend**

- React 19
- Vite 8
- ESLint

## Pré-requisitos

- Java 25
- Maven 3.9+
- MySQL 8 (local ou via Docker)
- Node.js 20.19+ ou 22.12+ (para o frontend)

Verificar Java:

```bash
java -version
# openjdk version "25.x.x"
```

## Como rodar

**1. Subir o banco:**

A aplicação espera um banco chamado `condomais` em `localhost:3306`, com usuário `root` e senha `CondoMais1000` (definidos em `src/main/resources/application.properties`). Se você não tem um MySQL local, uma forma rápida é usar Docker:

```bash
docker run --name condomais-mysql \
  -e MYSQL_ROOT_PASSWORD=CondoMais1000 \
  -e MYSQL_DATABASE=condomais \
  -p 3306:3306 -d mysql:8
```

As tabelas são criadas automaticamente pelo Hibernate (`spring.jpa.hibernate.ddl-auto=update`), a partir das annotations dos models.

**2. Configurar o JWT:**

O backend lê três propriedades de JWT que precisam existir no `application.properties` (ou em variáveis de ambiente equivalentes):

```properties
app.jwt.secret=troque-por-uma-chave-com-pelo-menos-32-caracteres
app.jwt.expiration-ms=900000
app.jwt.refresh-expiration-ms=604800000
```

- `app.jwt.secret` — chave de assinatura do access token (mínimo de 32 bytes).
- `app.jwt.expiration-ms` — validade do access token (exemplo acima: 15 minutos).
- `app.jwt.refresh-expiration-ms` — validade do refresh token (exemplo acima: 7 dias).

**3. Rodar o backend:**

Na raiz do repositório:

```bash
mvn spring-boot:run
```

A API sobe em `http://localhost:8080`. Os logs SQL aparecem no console (`spring.jpa.show-sql=true`).

**4. Rodar o frontend:**

Em outro terminal:

```bash
cd Front
npm install
npm run dev
```

O Vite informa o endereço no terminal (por padrão, `http://localhost:5173`).

**5. Criar o primeiro síndico:**

O cadastro público (`POST /api/v1/auth/cadastro`) **não permite** criar um síndico. O primeiro síndico deve ser promovido direto no banco, depois de cadastrar um morador normalmente:

```sql
-- confira os nomes exatos de tabela/coluna com SHOW TABLES / DESCRIBE
UPDATE Moradores SET Funcao = 'SINDICO' WHERE Email = 'sindico@email.com';
```

**6. Derrubar:**

`Ctrl+C` nos terminais do backend e do frontend. Para parar o MySQL do Docker:

```bash
docker stop condomais-mysql
```

Para apagar o container (e os dados) também:

```bash
docker rm -f condomais-mysql
```

## Endpoints principais

Todos os endpoints, exceto `/api/v1/auth/**`, exigem o header `Authorization: Bearer <token>`.

| Método | Endpoint | Acesso |
|---|---|---|
| `POST` | `/api/v1/auth/cadastro` | Público (apenas função COMUM) |
| `POST` | `/api/v1/auth/login` | Público |
| `POST` | `/api/v1/auth/refresh` | Público (com refresh token válido) |
| `GET` | `/api/v1/moradores/eu` | Autenticado |
| `PATCH` | `/api/v1/moradores/eu` | Autenticado |
| `GET` | `/api/v1/moradores` | Autenticado |
| `GET` | `/api/v1/moradores/{id}` | SINDICO |
| `GET` | `/api/v1/apartamentos` | Autenticado |
| `GET` | `/api/v1/apartamentos/{id}` | Autenticado |
| `POST` | `/api/v1/apartamentos` | Autenticado |
| `PATCH` | `/api/v1/apartamentos/{id}` | Autenticado |
| `DELETE` | `/api/v1/apartamentos/{id}` | Autenticado |
| `GET` | `/api/v1/area-comum` | Autenticado |
| `GET` | `/api/v1/area-comum/{id}` | Autenticado |
| `POST` | `/api/v1/area-comum` | Autenticado |
| `PATCH` | `/api/v1/area-comum/{id}` | Autenticado |
| `DELETE` | `/api/v1/area-comum/{id}` | Autenticado |
| `GET` | `/api/v1/reservas` | Autenticado |
| `GET` | `/api/v1/reservas/{id}` | Autenticado |
| `POST` | `/api/v1/reservas` | Autenticado |
| `PATCH` | `/api/v1/reservas/{id}` | Autenticado (inclusive para cancelar) |
| `DELETE` | `/api/v1/reservas/{id}` | Autenticado |
| `GET` | `/api/v1/avisos` | Autenticado |
| `GET` | `/api/v1/avisos/{id}` | Autenticado |
| `POST` | `/api/v1/avisos` | Autenticado |
| `PATCH` | `/api/v1/avisos/{id}` | Autenticado |
| `DELETE` | `/api/v1/avisos/{id}` | Autenticado |

As atualizações usam `PATCH` com semântica parcial: campos não enviados (`null`) são ignorados e o valor atual é mantido.

## Fluxos de uso

O frontend atual é um **protótipo navegável**: as telas existem e validam seus formulários, mas ainda exibem dados de exemplo e não chamam a API. Além disso, no perfil do morador apenas o painel inicial tem tela hoje, e o menu do síndico tem itens (como "Avisos e Comunicados") ainda sem página. Por isso, cada fluxo indica o componente envolvido em cada passo: **[Frontend]** descreve a tela onde o usuário age (ou onde a ação está prevista no menu); **[Backend]** descreve o endpoint que atende (ou atenderá) aquela ação.

### 1. Cadastrar-se e entrar no sistema (morador)

1. **[Frontend]** Na tela de login, escolher o perfil **"Sou Morador"**.
2. **[Backend]** Se ainda não tem conta, o morador se cadastra em `POST /api/v1/auth/cadastro` informando nome, e-mail, senha (8 a 72 caracteres) e telefone. A função assumida é `COMUM`; tentar se cadastrar como `SINDICO` é recusado, e e-mail repetido retorna `409 Conflict`.
3. **[Backend]** O login é feito em `POST /api/v1/auth/login` com e-mail e senha. A resposta traz o **access token** (JWT), o **refresh token** e os dados do morador.
4. **[Frontend]** Com o login concluído, o usuário cai no painel do morador (avisos recentes, próximas reservas e acesso rápido).

### 2. Manter a sessão ativa (renovação de token)

1. **[Frontend]** Guardar o access token e o refresh token recebidos no login e enviar o access token no header `Authorization: Bearer <token>` em toda chamada.
2. **[Backend]** Quando o access token expirar, a API responde `401`.
3. **[Frontend]** Ao receber o `401`, chamar o refresh em vez de pedir login de novo.
4. **[Backend]** `POST /api/v1/auth/refresh` com o refresh token devolve um **novo par** de tokens. O refresh token usado é revogado (rotação); reutilizá-lo, ou usar um expirado, retorna `401`.

### 3. Consultar e atualizar o próprio perfil

1. **[Frontend]** Na área do morador, abrir **"Meu Perfil"**.
2. **[Backend]** Os dados do usuário logado vêm de `GET /api/v1/moradores/eu` (o morador é identificado pelo token, sem precisar enviar ID).
3. **[Frontend]** Editar nome, e-mail, telefone ou apartamento e salvar.
4. **[Backend]** `PATCH /api/v1/moradores/eu` grava a alteração. Se o novo e-mail já pertence a outro morador, retorna `409 Conflict`.

### 4. Preparar o condomínio (síndico)

1. **[Frontend]** Entrar pelo perfil **"Sou Síndico"** e abrir **"Unidades"** no menu lateral.
2. **[Frontend]** Clicar em **"Nova Unidade"** e preencher bloco, número e andar.
3. **[Backend]** A unidade é criada em `POST /api/v1/apartamentos`; a listagem vem de `GET /api/v1/apartamentos`. Ajustes e remoção usam `PATCH` e `DELETE` em `/api/v1/apartamentos/{id}`.
4. **[Backend]** As áreas comuns do condomínio (salão de festas, churrasqueira, quadra, piscina etc.) são cadastradas em `POST /api/v1/area-comum`, com nome, capacidade e horário de funcionamento.
5. **[Frontend]** Abrir **"Moradores"** para acompanhar quem está cadastrado e em qual unidade.
6. **[Backend]** A listagem vem de `GET /api/v1/moradores`, e o detalhe de um morador, de `GET /api/v1/moradores/{id}` (restrito ao síndico; outro perfil recebe `403 Forbidden`).

### 5. Reservar uma área comum

1. **[Frontend]** Abrir **"Reservas"** no menu do síndico e clicar em **"Nova Reserva"** (para o morador, o atalho **"Reservar Nova Área Comum"** do painel está previsto para o mesmo formulário).
2. **[Frontend]** Escolher a área, a data e o horário. A tela valida os campos e impede reservar a mesma área em horário que se sobrepõe a uma reserva existente.
3. **[Backend]** A reserva é criada em `POST /api/v1/reservas` com status inicial `MARCADA`.
4. **[Backend]** Para cancelar, o status é alterado para `CANCELADA` via `PATCH /api/v1/reservas/{id}`; depois do uso, pode ser marcada como `CONCLUÍDA`.
5. **[Frontend]** A agenda do dia e a lista de próximas reservas mostram o resultado.

### 6. Publicar e ler avisos no mural

1. **[Frontend]** O síndico abre **"Avisos e Comunicados"** para redigir um comunicado.
2. **[Backend]** O aviso é criado em `POST /api/v1/avisos` com título (até 40 caracteres), corpo (até 500 caracteres), data de publicação e autor.
3. **[Frontend]** Os moradores veem os avisos no card de avisos do painel e no **"Mural de Avisos"**.
4. **[Backend]** O mural é alimentado por `GET /api/v1/avisos`. Correções e remoção usam `PATCH` e `DELETE` em `/api/v1/avisos/{id}`.

## Decisões de arquitetura

### API REST monolítica em camadas

Cada feature segue o padrão `Controller → Service → Repository → Model`, com `DTOs` e `mapper` ao lado. Pacotes organizados **por entidade**(com exceção de login), facilitando navegação:

```
br.com.condomais.reserva
├── controller/ReservaController.java
├── service/ReservaService.java
├── repository/ReservaRepository.java
├── model/Reserva.java
├── enums/ReservaStatusEnum.java
├── mapper/ReservaMapper.java
└── DTOs/ReservaCreateDTO.java, ReservaUpdateDTO.java, ReservaResponseDTO.java
```

### Annotations de persistência explícitas nos models

Todas as entidades declaram **de forma explícita** o seu mapeamento com o banco, em vez de depender dos padrões do JPA/Hibernate: `@Table(name = ...)` para a tabela, `@Column(name = ...)` para cada coluna, `@GeneratedValue(strategy = GenerationType.IDENTITY)` para a chave primária, `@Enumerated(EnumType.STRING)` para enums e `@JoinColumn(name = ...)` nos relacionamentos.

O objetivo é que quem programa **enxergue o banco ao escrever o model**: o nome de cada tabela e coluna, quem é o lado dono da chave estrangeira e como cada enum é gravado ficam visíveis no código, e a implementação é feita com consciência do impacto no schema.

Exemplo em `Morador`:

```java
@Entity
@Table(name = "Moradores")
public class Morador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)   // grava "COMUM"/"SINDICO", não a posição do enum
    @Column(name = "Funcao")
    private FuncaoMoradorEnum funcao;

    @ManyToOne
    @JoinColumn(name = "Apartamento")
    private Apartamento apartamento;
}
```

Em `Apartamento`, o lado inverso da relação deixa explícito o comportamento em cascata: `@OneToMany(mappedBy = "apartamento", cascade = CascadeType.ALL, orphanRemoval = true)`. Em `RefreshToken`, o mapeamento vai além e declara também restrições (`nullable`, `unique`, `length`) e índices (`@Index`).

Trade-off: os models ficam mais verbosos, e os nomes escolhidos ficam acoplados ao schema. Como o schema é gerado a partir dessas annotations (`ddl-auto=update`), revisar as annotations equivale a revisar o banco.

### Autenticação stateless via JWT com refresh token

O access token é um JWT assinado (HMAC-SHA, algoritmo escolhido pelo tamanho da chave), com o e-mail como `subject` e as claims `moradorId` e `funcao`. O filtro `JwtAuthFilter` intercepta cada request, valida o token e popula o `SecurityContext`. Sem sessão no servidor.

O refresh token é uma string aleatória de 64 bytes; o banco guarda apenas o **hash SHA-256**, nunca o valor original. A cada `/auth/refresh` ele é **rotacionado**: o token usado é marcado como revogado e um novo é emitido.

### Autorização no service, não com `@PreAuthorize`

A verificação de permissão por perfil fica explícita no service, em `if`s claros, em vez de annotations espalhadas. Exemplo em `MoradorService.buscarPorIdComoSindico`:

```java
if (moradorAutenticado.getFuncao() != FuncaoMoradorEnum.SINDICO) {
    throw new ProibidoException("Apenas o síndico pode executar esse comando.");
}
```

### DTOs separados e MapStruct

Cada entidade tem DTOs distintos para criação, atualização e resposta (`*CreateDTO`, `*UpdateDTO`, `*ResponseDTO`), convertidos por mappers MapStruct. O `MoradorResponseDTO`, por exemplo, não possui os campos de senha e e-mail. Os mappers usam `NullValuePropertyMappingStrategy.IGNORE`, o que dá o comportamento de `PATCH` parcial: só os campos enviados são alterados.

### Tratamento global de erros

`@RestControllerAdvice` em `GlobalExceptionHandler` mapeia as exceptions de domínio para respostas padronizadas (`ErrorResponseDto` com `timestamp`, `status`, `erro` e `mensagem`):

| Exception | Status |
|---|---|
| `IdNaoEncontradoException` | `404 Not Found` |
| `EmailJaExisteException` | `409 Conflict` |
| `ProibidoException` | `403 Forbidden` |
| `RefreshTokenInvalidoException` | `401 Unauthorized` |

### Frontend desacoplado em React + Vite

O frontend é uma SPA independente, na pasta `Front/`, com um fluxo de telas por perfil: o login define o perfil (morador ou síndico), e o `App.jsx` escolhe o painel e as páginas correspondentes, com um menu lateral próprio para cada perfil. A comunicação com o backend será feita apenas via API REST, o que permite evoluir e publicar os dois lados separadamente.

## Modelo de dados

```
┌─────────────┐         ┌──────────────┐
│ Apartamento │ 1     N │   Morador    │
│             ├─────────┤              │
│ id          │  abriga │ id           │
│ numero      │         │ nome         │
│ andar       │         │ funcao       │
│ bloco       │         │ email        │
└─────────────┘         │ senha        │
                        │ telefone     │
                        │ apartamento  │
                        └──┬─────┬───┬─┘
                           │     │   │
              1 publica N  │     │   │ 1 possui N
           ┌───────────────┘     │   └──────────────┐
           │                     │ 1 faz N          │
    ┌──────┴──────┐       ┌──────┴──────┐    ┌──────┴────────┐
    │    Aviso    │       │   Reserva   │    │ RefreshToken  │
    │             │       │             │    │               │
    │ id          │       │ id          │    │ id            │
    │ titulo      │       │ areaComum   │    │ morador       │
    │ corpo       │       │ morador     │    │ tokenHash     │
    │ dataPublic. │       │ data        │    │ expiraEm      │
    │ autor       │       │ horario     │    │ revogado      │
    └─────────────┘       │ status      │    └───────────────┘
                          └──────┬──────┘
                                 │ N
                                 │ ocupa
                                 │ 1
                          ┌──────┴──────┐
                          │  AreaComum  │
                          │             │
                          │ id          │
                          │ nome        │
                          │ capacidade  │
                          │ horarioFunc.│
                          └─────────────┘
```

**Relações:**
- `Apartamento 1:N Morador` (abriga) — cascade ALL com `orphanRemoval`
- `Morador 1:N Aviso` (publica) — o morador é o autor do aviso
- `Morador 1:N Reserva` (faz) — cada reserva pertence a um morador
- `AreaComum 1:N Reserva` (ocupa) — cada reserva é de uma área comum
- `Morador 1:N RefreshToken` (possui) — um morador pode ter vários refresh tokens ativos

**Enums:**
- `FuncaoMoradorEnum` — `COMUM`, `SINDICO`
- `ReservaStatusEnum` — `MARCADA`, `CONCLUÍDA`, `CANCELADA`

## Estrutura de pacotes

```
src/main/java/br/com/condomais/
├── CondoSysApplication.java
├── apartamento/           controller, service, repository, model, mapper, DTOs
├── areacomum/             controller, service, repository, model, mapper, DTOs
├── aviso/                 controller, service, repository, model, mapper, DTOs
├── morador/               controller, service, repository, model, mapper, DTOs, enums
├── reserva/               controller, service, repository, model, mapper, DTOs, enums
├── login/
│   ├── auth/              AuthController, AuthService, RefreshTokenService, RefreshToken, DTOs
│   └── security/          SecurityConfig, JwtService, JwtAuthFilter, JwtAuthEntryPoint, MoradorDetails*
└── compartilhado/         GlobalExceptionHandler, ErrorResponseDto, exceptions de domínio

src/main/resources/
└── application.properties Banco, JPA e (a configurar) JWT

Front/
├── index.html
├── vite.config.js
└── src/
    ├── App.jsx            Escolha de perfil e navegação entre páginas
    ├── components/        Header, Sidebar, ReservationCard, NoticeCard, OccurrencesTable
    └── pages/
        ├── Login.jsx
        ├── Morador_Perfil/    MoradorDashboard
        └── Sindico_Perfil/    Dashboard, Moradores, Unidades, Reservas, Ocorrências e modais

Docs/
├── requisitos/            requisitos funcionais e não funcionais
└── casos-de-uso/          cadastrar apartamento, aviso, morador; reservar área
```

## Débitos técnicos conhecidos

Itens reconhecidos como fora de escopo desta entrega:

- **Frontend sem integração** — as telas usam dados de exemplo e o login do `Login.jsx` apenas troca de perfil, sem chamar a API. Integração com os endpoints (e armazenamento dos tokens) é o próximo passo natural.
- **Ocorrências e Relatórios só no frontend** — existem como telas/menus, mas não há entidade nem endpoint correspondente no backend.
- **Regras de reserva no backend** — o bloqueio de reservas com horário sobreposto hoje existe apenas na tela; `POST /api/v1/reservas` ainda não valida conflito.
- **DTOs apontando para entidades** — alguns DTOs (ex.: `MoradorResponseDTO`, `ReservaCreateDTO`) referenciam diretamente as entidades `Apartamento`, `Morador` e `AreaComum` em vez de IDs ou DTOs aninhados, o que acopla a API ao modelo de persistência.
- **Senha no `PATCH /moradores/eu`** — a senha enviada na atualização do perfil ainda não passa pelo `PasswordEncoder` (o cadastro já faz o hash com BCrypt).
- **Configuração sensível no repositório** — usuário e senha do banco estão fixos no `application.properties`, e as propriedades de JWT precisam ser criadas manualmente.
- **CORS aberto** — `SecurityConfig` aceita qualquer origem; deve ser restringido ao domínio do frontend.
- **Sem testes automatizados** — ainda não há testes do backend nem do frontend.

## Autores

Fernanda Carolina Sampaio
Pedro Henrique de Almeida
Anna Sophia Fraga
Pedro Rodrigo do Carmo
Jessica de Faro Menezes