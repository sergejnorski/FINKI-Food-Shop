import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import {Button, Card} from '@mui/material';
import {useLocation} from "react-router-dom";



export const AddressCard = ({ item, isSelected, onSelect }) => {
  return (
    <Card
      className={`flex gap-5 w-64 p-5 ${isSelected ? 'border-2 border-blue-500' : ''}`}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex-row">
        <HomeIcon />
        <h1>{item?.locationType}</h1>
        <p>{item?.streetAddress}</p>
        <p>{item?.city}</p>
        <p>{item?.mobile}</p>
        {onSelect && (
          <Button
            variant={isSelected ? "contained" : "outlined"}
            onClick={onSelect}
            fullWidth
            style={{ marginTop: '10px' }}
          >
            {isSelected ? "Изберена" : "Изберете"}
          </Button>
        )}
      </div>
    </Card>
  );
};