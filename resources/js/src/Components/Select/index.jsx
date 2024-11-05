import React, {useState} from 'react';
import {
    createListCollection,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
} from "@chakra-ui/react"

const Select = ({title, variants, width = "100px", value, handleChange}) => {
    const [collection, setCollection] = useState(createListCollection({
        items: variants,
    }))
    return (
        <SelectRoot
            collection={collection}
            size="sm"
            width={width}
            value={value}
            onValueChange={handleChange}
        >
            <SelectLabel fontSize={"10px"}>{title}</SelectLabel>
            <SelectTrigger>
                <SelectValueText placeholder={title}/>
            </SelectTrigger>
            <SelectContent>
                {collection.items.map((movie) => (
                    <SelectItem item={movie} key={movie.value}>
                        {movie.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </SelectRoot>
    );
};

export default Select;
