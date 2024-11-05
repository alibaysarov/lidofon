import React, { useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const changePage = (page) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const renderPages = () => {
        const pages = [];
        const delta = 2;

        pages.push(
            <Button
                key={1}
                onClick={() => changePage(1)}
                colorPalette={currentPage === 1 ? 'blue' : 'gray'}
                variant={currentPage === 1 ? 'filled' : 'subtle'}
            >
                1
            </Button>
        );

        if (currentPage > delta + 2) {
            pages.push(
                <Text key="start-ellipsis" mx={2}>
                    ...
                </Text>
            );
        }
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            pages.push(
                <Button
                    key={i}
                    onClick={() => changePage(i)}
                    colorPalette={currentPage === i ? 'blue' : 'gray'}
                    variant={currentPage === i ? 'filled' : 'subtle'}
                >
                    {i}
                </Button>
            );
        }

        if (currentPage < totalPages - delta - 1) {
            pages.push(
                <Text key="end-ellipsis" mx={2}>
                    ...
                </Text>
            );
        }

        pages.push(
            <Button
                key={totalPages}
                onClick={() => changePage(totalPages)}
                colorPalette={currentPage === totalPages ? 'blue' : 'gray'}
                variant={currentPage === totalPages ? 'filled' : 'subtle'}
            >
                {totalPages}
            </Button>
        );

        return pages;
    };

    return (
        <Box display="flex" alignItems="center" gap={2}>
            {renderPages()}
        </Box>
    );
};

export default Pagination;
