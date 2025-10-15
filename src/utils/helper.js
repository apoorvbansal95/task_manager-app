export const validateEmail=(email)=>{
    const regex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return regex.test(email)
}

export const getInitials=(name)=>{
    const names=name.split(' ')
    let initial=""
    for(let i=0;i<names.length;i++){
        initial+=names[i][0]
    }
    return initial.toUpperCase()
}