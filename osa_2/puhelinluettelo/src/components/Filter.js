const Filter = (props) => {
    return (
        <div>
            filter shown with <input value={props.showAll} onChange={props.handleFilterChange}/>
        </div>
    )
}

export default Filter