import React, { useState, useEffect, ChangeEvent } from 'react';

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
}

const AutoComplete: React.FC = () => {
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState<UserData[]>([]);
  const [filteredData, setFilteredData] = useState<UserData[]>([]);

  useEffect(() => {

    // fetch user data from the API everytime when the page is opened
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://random-data-api.com/api/users/random_user?size=50'
        );
        const data = await response.json()

        setUserData(data)
        setIsLoading(false)

      } catch (error) {
        console.error('Error fetching data: ', error)
        setIsLoading(false)
      }
    };

    fetchData()

  }, []);

  useEffect(() => {

    // update filtered data when the value is empty or contains only spaces
    if (inputValue.trim() === '') {
      setFilteredData([]);
      return;
    }

    // filter data by first_name and last_name
    const filtered = userData.filter(
      user =>
        user.first_name.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.last_name.toLowerCase().includes(inputValue.toLowerCase())
    )

    setFilteredData(filtered)

  }, [inputValue, userData])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  // highlight text functionality
  const highlightText = (text: string, highlight: string) => {

    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="autocomplete-container">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search"
        />
      </div>

      {isLoading && <div className="pt-1">Loading...</div>}

      {!isLoading && filteredData.length > 0 && (
        <div className="dropdown">
          {filteredData.map(user => (
            <div
              key={user.id}
              className="dropdown-item"
              onClick={() => setInputValue(user.first_name + ' ' + user.last_name)}
            >
              {highlightText(
                `${user.first_name} ${user.last_name}`,
                inputValue
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default AutoComplete;