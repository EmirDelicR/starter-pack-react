import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { List, ListItem, LoadingOverlay, Pagination, Paper, Text, Title } from '@mantine/core';
import { useGetPaginatedTodosQuery } from '../store/todoApiSlice';
import { MockData } from './MockData';

const LIMIT = 5;

function chunk<T>(array: T[]): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, LIMIT);
  const tail = array.slice(LIMIT);
  return [head, ...chunk(tail)];
}

const data = chunk(MockData);

export default function TodoList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || 1);

  const onChange = (p: number) => {
    searchParams.set('page', `${p}`);
    setSearchParams(searchParams);
  };

  return (
    <Paper pos="relative">
      <LoadingOverlay visible={false} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
      <List>
        {data[currentPage - 1]?.map((item) => (
          <ListItem key={item.id}>
            <Title>{item.title}</Title>
            <Text>
              {item.id} : {item.description}
            </Text>
          </ListItem>
        ))}
      </List>
      <Pagination total={MockData.length / LIMIT} value={currentPage} onChange={onChange} mt="sm" />
    </Paper>
  );
}
