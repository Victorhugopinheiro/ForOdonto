

export function FormatPhone(number: string) {

    const userNumber = number.replace(/\D/g, '')


    if(userNumber.length > 15){
        return number.slice(0, 12)
    }


    const formatNumber = userNumber
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2')

    return formatNumber


}


export function OnlyNumber(number:string){
    
    const userNumber = number.replace(/\D/g, '')
    return userNumber
}