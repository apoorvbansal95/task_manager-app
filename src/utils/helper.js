export const validateEmail=(email)=>{
    const regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email)
}

export const getInitials=(name)=>{
    if (!name) return "";
    const names=name.split(" ")
    let initial=""
    for(let i=0;i<Math.min(names.length, 2);i++){
        initial+=names[i][0]
    }
    return initial.toUpperCase()
}