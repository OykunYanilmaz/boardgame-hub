import NavBar from "@/components/NavBar"
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
        <Box borderBottom='1px solid' borderColor='gray.800'>
          <NavBar />
        </Box>
        <Box padding={5}>
          <Outlet />
        </Box>
    </>
  )
}

export default Layout
