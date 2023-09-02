import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";
export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      onChange={(e) =>
        dispatch(fetchDataByGenre({ genre: e.target.value, type }))
      }
    >
      {genres &&
        genres.map((item) => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.4rem;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  display: flex;
`;
