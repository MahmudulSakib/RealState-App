import Link from "next/link";
import { Button, Menu, Portal } from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { Flex, Box, Spacer } from "@chakra-ui/react";

const Navbar = () => (
  <Flex p="2" pl="20" pr="20" borderBottom="1px" borderColor="gray.100">
    <Box fontSize="3xl" color="blue.400" fontWeight="bold">
      <Link href="/">Realtor</Link>
    </Box>
    <Spacer />

    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <FcMenu />
        </Button>
      </Menu.Trigger>

      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="new-txt">
            <FcHome />
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item value="new-txt">
            <BsSearch />
            <Link href="/search" style={{ textDecoration: "none" }}>
              Search
            </Link>
          </Menu.Item>
          <Menu.Item value="new-txt">
            <FcAbout />
            <Link href="/search?purpose=for-sale">Buy Property</Link>
          </Menu.Item>
          <Menu.Item value="new-txt">
            <FiKey />
            <Link href="/search?purpose=for-rent">Rent Property</Link>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  </Flex>
);

export default Navbar;
