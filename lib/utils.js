export const currencyFormatter = (amount)=>{
    const formater = Intl.NumberFormat("en-IN",{        
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR'
    })

    return formater.format(amount)
}

export function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }