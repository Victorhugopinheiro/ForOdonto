import { Plan } from "../../../generated/prisma";
import { PlansProps } from "../plans";


const plans: PlansProps = {
    BASIC: {
        maxServices: 3
    },
    PROFESSIONAL: {
        maxServices: 50
    }
}

export function getPlan(plan: Plan ){

    return plans[plan]

}