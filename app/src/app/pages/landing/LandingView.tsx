import { Box, Button, Container, Divider, Stack, Typography } from "@mui/material";
import banner from "../../../assets/images/banner.svg";
import bannerBg from "../../../assets/images/banner-bg.svg";
import { Link } from "react-router-dom";
import Slide from "../../components/animate/Slide";
import { SVG } from "../../components/images/Image";

const LandingView = () => {
  return (
    <Box
      height={1}
      sx={{ backgroundImage: `url(${bannerBg})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <Container sx={{ height: 1 }}>
        <Stack py={6} height={1} gap={6}>
          <Stack component={"header"} alignItems={"center"} gap={1} textAlign={"center"}>
            <Typography variant="h1" color={"primary.main"}>
              Vizor
            </Typography>
            <Typography variant="h3">Serverless realtime monitoring</Typography>
          </Stack>
          <Stack component={"main"} gap={10} flex={1} direction={{ md: "row" }}>
            <Stack gap={5} flex={1} justifyContent={"center"} alignItems={{ xs: "center", md: "start" }}>
              <Slide from="Up" withFade value={20} duration={0.75} style={{}}>
                <Typography textAlign={"justify"} color={"grey.700"}>
                  Vizor is a real-time monitoring and service management platform that empowers IT teams with live
                  metrics on CPU, memory, and network usage. Easily manage service statuses, start, stop, or restart
                  services, and monitor logs in real time with instant filtering. Vizor provides complete system
                  visibility and control, ensuring smooth operations and rapid issue resolution from a single interface.
                </Typography>
              </Slide>
              <Slide from="Down" withFade value={20} duration={0.75} style={{}}>
                <Stack direction={"row"} gap={4}>
                  {
                    //@ts-ignore
                    <Button
                      to="/setup/step1"
                      size="large"
                      color="primary"
                      variant="contained"
                      LinkComponent={Link}
                      endIcon={<SVG.app size={32} />}
                    >
                      Setup new host
                    </Button>
                  }
                  <Button LinkComponent={"a"} size="large" color="primary" startIcon={<SVG.download size={24} />}>
                    Download Agent
                  </Button>
                </Stack>
              </Slide>
            </Stack>
            <Stack flex={1} alignItems={{ xs: "center", md: "end" }} justifyContent={"center"}>
              <Slide withFade value={120} duration={0.75}>
                <Box component={"img"} src={banner} sx={{ width: { xs: 350, md: 450 } }} />
              </Slide>
            </Stack>
          </Stack>

          <Stack component={"footer"} direction={"row"} gap={1} justifyContent={"center"}>
            <Typography variant="body2">@2024, All right reserved</Typography>
            <Divider orientation="vertical" />
            <Typography
              component={"a"}
              variant="body2"
              fontWeight={500}
              color={"primary.main"}
              href="https://polinkhan.com"
              sx={{ textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              Abu Sayed Polin
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingView;
