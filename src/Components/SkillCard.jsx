function SkillCard({label, img}){
    return(
        <div className='skillCard'>
            <img src={img} className='skillLogo'></img>
            <p style={{textAlign:'center', margin: '0'}}>{label}</p>
        </div>
    )
}

export default SkillCard