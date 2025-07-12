
import { canPermission } from "@/utils/limitPlan/canPermission"
import { GetAllServices } from "../_data-access/get-all-services"
import { ContentService } from "./contentService"
import { ShowLimitPlan } from "@/components/show-limit-plan"


interface UserSessionProps {
    userId: string
}

export async function ContainerServices({ userId }: UserSessionProps) {




    const response = await GetAllServices({ user_id: userId })

    const hasPermission = await canPermission({ type: "service" })


    return (
        <div>
            <>
                {!hasPermission.hasPermission && (
                    <ShowLimitPlan expired={hasPermission.expired} />
                )}
            </>
            <ContentService service={response.data || []} userPermission={hasPermission} />
        </div>
    )
}