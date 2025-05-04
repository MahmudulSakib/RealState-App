"use client";
import { useContext } from "react";
import Image from "next/image";
import { Box, Icon, Flex } from "@chakra-ui/react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface ImageItem {
  id: string | number;
  url: string;
}

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
        opacity={isFirstItemVisible ? "0" : "1"}
        transition="opacity 0.3s"
        display={["none", "none", "none", "block"]}
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginLeft="1">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
        opacity={isLastItemVisible ? "0" : "1"}
        transition="opacity 0.3s"
        display={["none", "none", "none", "block"]}
      />
    </Flex>
  );
};

interface ImageScrollbarProps {
  data: ImageItem[];
}

const ImageScrollbar = ({ data }: ImageScrollbarProps) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item) => (
        <Box
          key={item.id}
          itemID={String(item.id)}
          width="910px"
          overflow="hidden"
          p="1"
        >
          <Image
            placeholder="blur"
            blurDataURL={item.url}
            src={item.url}
            alt="property"
            width={1000}
            height={500}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              maxHeight: "500px",
            }}
            sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px"
          />
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default ImageScrollbar;
