// src/app/property/[id]/page.tsx

import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseUrl, fetchApi } from "@/utils/fetchApi";
import ImageScrollbar from "@/components/ImageScrollbar";

interface Agency {
  logo?: { url?: string };
}

interface Amenity {
  text: string;
}

interface AmenityGroup {
  amenities: Amenity[];
}

interface Photo {
  id: string | number;
  url: string;
}

interface PropertyDetailsType {
  price: number;
  rentFrequency?: string;
  rooms: number;
  title: string;
  baths: number;
  area: number;
  agency: Agency;
  isVerified: boolean;
  description: string;
  type: string;
  purpose: string;
  furnishingStatus?: string;
  amenities: AmenityGroup[];
  photos: Photo[];
}

interface PropertyDetailsProps {
  propertyDetails: PropertyDetailsType;
}

const PropertyDetails = ({ propertyDetails }: PropertyDetailsProps) => {
  const {
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  } = propertyDetails;

  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollbar data={photos} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center">
          <Box paddingRight="3" color="green.400">
            {isVerified && <GoVerified />}
          </Box>
          <Text fontWeight="bold" fontSize="lg">
            AED {price} {rentFrequency && `/${rentFrequency}`}
          </Text>
          <Spacer />
          <Avatar.Root>
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src={agency?.logo?.url} />
          </Avatar.Root>
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms}
          <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
      </Box>
      <Box marginTop="2">
        <Text fontSize="lg" marginBottom="2" fontWeight="bold">
          {title}
        </Text>
        <Text lineHeight="2" color="gray.600">
          {description}
        </Text>
      </Box>
      <Flex
        flexWrap="wrap"
        textTransform="uppercase"
        justifyContent="space-between"
      >
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Type</Text>
          <Text fontWeight="bold">{type}</Text>
        </Flex>
        <Flex
          justifyContent="space-between"
          w="400px"
          borderBottom="1px"
          borderColor="gray.100"
          p="3"
        >
          <Text>Purpose</Text>
          <Text fontWeight="bold">{purpose}</Text>
        </Flex>
        {furnishingStatus && (
          <Flex
            justifyContent="space-between"
            w="400px"
            borderBottom="1px"
            borderColor="gray.100"
            p="3"
          >
            <Text>Furnishing Status</Text>
            <Text fontWeight="bold">{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>
      <Box>
        {amenities.length > 0 && (
          <Text fontSize="2xl" fontWeight="black" marginTop="5">
            Facilities:
          </Text>
        )}
        <Flex flexWrap="wrap">
          {amenities?.map((group) =>
            group?.amenities?.map((amenity) => (
              <Text
                key={amenity.text}
                fontWeight="bold"
                color="blue.400"
                fontSize="l"
                p="2"
                bg="gray.200"
                m="1"
                borderRadius="5"
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  );
};

// ✅ New Next.js App Router export
export default async function Page({ params }: { params: { id: string } }) {
  const data = await fetchApi(
    `${baseUrl}/properties/detail?externalID=${params.id}`
  );

  return <PropertyDetails propertyDetails={data} />;
}
