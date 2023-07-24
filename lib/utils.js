export const currencyformatter = (amount)=>{
    const formater = Intl.NumberFormat("en-IN",{        
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    })

    return formater.format(amount)
}