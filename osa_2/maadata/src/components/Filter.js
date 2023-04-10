const Filter = ({ filter, handleFilterChange }) => {
    return (
      <div>
        find countries
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter countries by name"
      />
      </div>
      
    );
}

export default Filter