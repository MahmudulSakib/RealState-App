"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import Property from "@/components/Property";
import noResult from "@/assets/noresult.svg";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import SearchFilters from "@/components/SearchFilters";

const Search = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [properties, setProperties] = useState([]);
  const searchParams = useSearchParams();
  const purpose = searchParams.get("purpose");
  //   const minPrice = searchParams.get("minPrice") || "0";
  //   const maxPrice = searchParams.get("maxPrice") || "1000000";
  const roomsMin = searchParams.get("roomsMin") || "0";
  const bathsMin = searchParams.get("bathsMin") || "0";
  const sort = searchParams.get("sort") || "price-desc";
  const areaMax = searchParams.get("areaMax") || "35000";
  const locationExternalIDs = searchParams.get("locationExternalIDs") || "5002";
  const categoryExternalID = searchParams.get("categoryExternalID") || "4";
  const rentFrequency = searchParams.get("rentFrequency") || "yearly";
  useEffect(() => {
    const fetchProperties = async () => {
      const data = await fetchApi(
        `${baseUrl}/properties/list?` +
          `locationExternalIDs=${parseInt(
            locationExternalIDs,
            10
          ).toString()}` +
          `&purpose=${purpose}` +
          `&categoryExternalID=${parseInt(categoryExternalID, 10).toString()}` +
          `&bathsMin=${parseInt(bathsMin, 10).toString()}` +
          `&rentFrequency=${rentFrequency}` +
          `&roomsMin=${parseInt(roomsMin, 10).toString()}` +
          `&sort=${sort}` +
          `&areaMax=${parseInt(areaMax, 10).toString()}`
      );
      setProperties(data?.hits || []);
    };
    fetchProperties();
  }, [
    purpose,
    rentFrequency,
    roomsMin,
    bathsMin,
    sort,
    areaMax,
    locationExternalIDs,
    categoryExternalID,
  ]);

  return (
    <Box justifyContent="center">
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        textStyle="xl"
        fontWeight="bolder"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon pl="2" w="7">
          <BsFilter />
        </Icon>
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" pl="20" fontWeight="bold">
        Properties {purpose}
      </Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image alt="noresult" src={noResult} />
          <Text fontSize="xl" marginTop="3">
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
