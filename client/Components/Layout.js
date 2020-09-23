

const Layout =({children})=>{
    return (
        <React.Fragment>
            <p>Header</p>
            <p>{children}</p>
            <p>Footer</p>
        </React.Fragment>
    )
}

export default Layout