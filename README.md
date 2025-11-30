# 📅 Sistema de Agendamento SaaS para Clínicas de Estética

Este projeto é uma plataforma completa de agendamento e gestão para clínicas de estética e salões de beleza. O sistema funciona no modelo SaaS (Software as a Service), permitindo que clínicas se cadastrem, configurem seus serviços e recebam agendamentos de clientes com validação inteligente de horários.

## 🚀 Funcionalidades Principais

### 🏢 Para a Clínica (Painel Administrativo)
- **Gestão de Serviços:** Cadastro de serviços com definição personalizada de **duração (tempo)** e preço.
- **Gestão de Planos (SaaS):** Integração completa com **Stripe** para assinatura de planos:
  - **Plano Básico:** Recursos essenciais.
  - **Plano Profissional:** Recursos avançados e maior capacidade.
- **Controle de Agenda:** Visualização dos horários ocupados e disponíveis.

### 👤 Para o Cliente Final
- **Agendamento Online:** Interface intuitiva para seleção de serviços e profissionais.
- **Seleção Inteligente:** O sistema calcula automaticamente os horários disponíveis baseados na duração do serviço escolhido.

### ⚙️ Destaques Técnicos
- **Lógica Anti-Conflito:** Algoritmo robusto no backend que previne *overbooking* (dupla marcação). O sistema calcula o tempo de início + duração do serviço para bloquear a janela de tempo exata no banco de dados.
- **Pagamentos:** Integração via Webhooks com Stripe para gerenciar status de assinaturas (Ativo/Inativo/Cancelado).
- **Multi-Tenant:** Estrutura preparada para atender múltiplas clínicas simultaneamente.

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Next.js (React), Tailwind CSS
- **Backend:** Node.js (API Routes do Next.js)
- **Banco de Dados:** PostgreSQL
- **Pagamentos:** Stripe API
- **ORM:** Prisma (opcional, se tiver usado)

## 📸 Screenshots

*(Coloque aqui prints das telas do seu projeto: Tela de Login, Dashboard da Clínica, Tela de Agendamento do Cliente)*

## 🔧 Como rodar o projeto

1. Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
