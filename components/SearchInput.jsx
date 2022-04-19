import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

function SearchInput({
  placeholder,
  size,
  onSearch,
  enterButton,
  ...otherProps
}) {
  return (
    <Search
      placeholder={placeholder}
      allowClear
      enterButton={enterButton || 'Search'}
      size={size || 'middle'}
      onSearch={onSearch}
      {...otherProps}
    />
  );
}

export default SearchInput;
