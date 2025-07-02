


export type PlanDetailProps = {
    maxServices: number
}


export type PlansProps = {
    BASIC: PlanDetailProps,
    PROFESSIONAL: PlanDetailProps
}


const plans: PlansProps = {
    BASIC: {
        maxServices: 3
    },
    PROFESSIONAL: {
        maxServices: 50
    }
}


export const subscription = [
    {
        id: "BASIC",
        name: "Básico",
        description: "Perfeito para clinicas menores",
        oldPrice: "R$97,90",
        price: "R$49,90",
        features: [
            `Até ${plans.BASIC.maxServices} Serviços`,
            "Agendamento ilimitados",
            "Suporte",
            "Relatórios"
        ]
    },
    {
        id: "PROFESSIONAL",
        name: "Profissional",
        description: "Ideal para clinicas Grandes",
        oldPrice: "R$197,90",
        price: "R$79,90",
        features: [
            `Até ${plans.PROFESSIONAL.maxServices} Serviços`,
            "Agendamento ilimitados",
            "Suporte prioritário",
            "Relatórios avançados"
        ]
    }
]