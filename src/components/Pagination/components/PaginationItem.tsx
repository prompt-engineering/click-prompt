import { Button, ThemeTypings } from '@chakra-ui/react';
import React from 'react';

interface PaginationItemProps {
  isCurrent?: boolean;
  page: number;
  onPageChange: (page: number) => void;
  colorScheme?: ThemeTypings['colorSchemes'];
}

export function PaginationItem({
  isCurrent = false,
  page,
  onPageChange,
  colorScheme,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme={colorScheme}
        disabled
        _disabled={{
          bg: `${colorScheme}.500`,
          cursor: 'pointer',
        }}
      >
        {page}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="gray.100"
      _hover={{
        bg: 'gray.300',
      }}
      onClick={() => onPageChange(page)}
    >
      {page}
    </Button>
  );
}
