"use client";

import React, { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import noresult from "@/assets/noresult.svg";
interface FilterOption {
  queryName: string;
  items: { name: string; value: string }[];
}

const filterData: FilterOption[] = [
  {
    queryName: "purpose",
    items: [
      { name: "Buy", value: "for-sale" },
      { name: "Rent", value: "for-rent" },
    ],
  },
  {
    queryName: "rentFrequency",
    items: [
      { name: "Daily", value: "daily" },
      { name: "Weekly", value: "weekly" },
      { name: "Monthly", value: "monthly" },
      { name: "Yearly", value: "yearly" },
    ],
  },
  {
    queryName: "sort",
    items: [
      { name: "Lowest Price", value: "price-asc" },
      { name: "Highest Price", value: "price-desc" },
      { name: "Newest", value: "date-desc" },
      { name: "Oldest", value: "date-asc" },
      { name: "Verified", value: "verified" },
      { name: "City Level Score", value: "city-level-score" },
    ],
  },
  {
    queryName: "priceMin",
    items: Array.from({ length: 10 }, (_, i) => ({
      name: `${(i + 1) * 1000}`,
      value: `${(i + 1) * 1000}`,
    })),
  },
  {
    queryName: "roomsMin",
    items: Array.from({ length: 10 }, (_, i) => ({
      name: `${i + 1}`,
      value: `${i + 1}`,
    })),
  },
  {
    queryName: "bathsMin",
    items: Array.from({ length: 10 }, (_, i) => ({
      name: `${i + 1}`,
      value: `${i + 1}`,
    })),
  },
  {
    queryName: "furnishingStatus",
    items: [
      { name: "Furnished", value: "furnished" },
      { name: "Unfurnished", value: "unfurnished" },
    ],
  },
  {
    queryName: "category",
    items: [
      { name: "Apartment", value: "apartment" },
      { name: "Townhouses", value: "townhouses" },
      { name: "Villas", value: "villas" },
      { name: "Penthouses", value: "penthouse" },
      { name: "Hotel Apartments", value: "hotel-apartment" },
      { name: "Villa Compound", value: "villa-compound" },
      { name: "Residential Plot", value: "residential-plot" },
      { name: "Residential Floor", value: "residential-floor" },
      { name: "Residential Building", value: "residential-building" },
    ],
  },
];

const SearchFilters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationData, setLocationData] = useState<any[]>([]);
  const [showLocations, setShowLocations] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchProperties = (filterValues: Record<string, string>) => {
    const query = new URLSearchParams(searchParams.toString());

    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        query.set(key, value);
      } else {
        query.delete(key);
      }
    });

    router.push(`${pathname}?${query.toString()}`);
  };

  const handleLocationSelect = (location: any) => {
    searchProperties({ locationExternalIDs: location.externalID });
    setShowLocations(false);
    setSearchTerm(location.name);
  };

  return (
    <Box bg="gray.100" p="3" mt="5" pl="20" pr="20">
      <Grid templateColumns="repeat(8, 1fr)" gap={2} alignItems="center">
        {filterData.map((filter) => (
          <GridItem key={filter.queryName}>
            <select
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
              style={{ width: "90%", padding: "20" }}
            >
              <option value="">{`Select ${filter.queryName}`}</option>
              {filter.items.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </GridItem>
        ))}

        <GridItem colSpan={1}>
          <Button
            onClick={() => setShowLocations((prev) => !prev)}
            colorScheme="blue"
            size="sm"
            w="full"
          >
            Search Location
          </Button>
        </GridItem>
      </Grid>

      {showLocations && (
        <Box mt={2} position="relative">
          <Flex align="center">
            <Input
              placeholder="Type location..."
              value={searchTerm}
              w="300px"
              bg="white"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <Icon
                as={MdCancel}
                cursor="pointer"
                ml={2}
                onClick={() => setSearchTerm("")}
              />
            )}
          </Flex>

          {loading && <Spinner mt={3} />}

          <Box maxH="300px" overflowY="auto" mt={2} bg="white" boxShadow="md">
            {locationData.length > 0 ? (
              locationData.map((location) => (
                <Box
                  key={location.id}
                  p={2}
                  _hover={{ bg: "gray.100" }}
                  cursor="pointer"
                  onClick={() => handleLocationSelect(location)}
                >
                  <Text>{location.name}</Text>
                </Box>
              ))
            ) : (
              <Flex
                justify="center"
                align="center"
                flexDir="column"
                p={5}
                textAlign="center"
              >
                <Image
                  src={noresult}
                  alt="No results"
                  width={100}
                  height={100}
                />
                <Text mt={2}>Waiting to search!</Text>
              </Flex>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SearchFilters;
