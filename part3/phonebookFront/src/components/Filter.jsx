function Filter({ handleFilterChange, newFilter }) {
    return (
      <>
        <div>
          filter shown with 
          <input name="filter" onChange={handleFilterChange} value={newFilter} />
        </div>
      </>
    )
  }
  
export default Filter