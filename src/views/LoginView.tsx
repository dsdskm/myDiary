import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { BIRTH_ID, LOGIN_ID, NAME_ID, NUMBER_ID, ROUTE_CONTENTS_EDIT_VIEW } from "common/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccount } from "state/states";
import Loading from "./components/Loading";
import { LABEL, MSG, STYLE } from "common/resources";
import { getAccount } from "api/api";
import bgLogin from "images/pc/background_login.png";
import bgBtn from "images/pc/background_button.png";
import mobileBgLogin from "images/mobile/background_login.png";
import { isMobile } from "react-device-detect";
import { styled } from "@mui/system";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const FieldWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const LoginCard = styled(Card)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
});

const DonwloadGuideText = styled(Typography)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 10,
  fontFamily: "regular",
});

const TitleWrapper = styled(Box)({
  width: "100%",
});

const LoginTitle = styled(Typography)({
  fontFamily: "bold",
  fontSize: 25,
});

const LoginSubTitle = styled(Typography)({
  fontFamily: "medium",
  fontSize: 20,
});

const NameField = styled(TextField)({
  fontFamily: "regular",
});

const InputPropsStyle = {
  style: {
    height: 50,
    borderRadius: 10,
  },
};

const LoginButton = styled(Button)({
  background: "white",
  fontFamily: "regular",
  fontSize: 20,
});

const LoginView = () => {
  const width = isMobile ? window.innerWidth : 1920;
  const height = isMobile ? window.innerHeight : "98vh";
  const cardWidth = isMobile ? width * 0.7 : 400;
  const fieldWidth = isMobile ? "100%" : STYLE.LOGIN_FIELD_WIDTH;
  const fieldHeight = STYLE.LOGIN_FIELD_HEIGHT;
  const downloadTextFontSize = isMobile ? 12 : 14;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [birth, setBirth] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const backgroundImage = isMobile ? mobileBgLogin : bgLogin;

  const onLoginClick = async () => {
    if (name && number && birth) {
      setLoading(true);
      const data = await getAccount(number);
      console.log(`data ${JSON.stringify(data)}`);
      if (data && data.name === name && data.birth === birth) {
        setLoading(false);
        dispatch(setAccount(data.id));
        navigate(ROUTE_CONTENTS_EDIT_VIEW);
        return;
      }
    }
    alert(MSG.LOGIN_ERR);
    setLoading(false);
  };
  if (loading) {
    return <Loading />;
  }

  const getFieldView = (id: string, value: string, setter: any, label: string, hint: string) => {
    return (
      <NameField id={id} value={value} onChange={(e) => setter(e.target.value)} sx={{ width: fieldWidth, height: fieldHeight, mb: 2 }} label={label} InputProps={InputPropsStyle} placeholder={hint} />
    );
  };
  return (
    <>
      <Wrapper>
        <FieldWrapper
          sx={{
            background: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: width,
            minWidth: width,
            height: height,
          }}
        >
          <LoginCard sx={{ p: 3, borderRadius: 5, width: cardWidth, mt: isMobile ? 7 : 0 }}>
            <TitleWrapper sx={{ mb: 2 }}>
              <LoginTitle>{LABEL.LOGIN_TITLE}</LoginTitle>
              <LoginSubTitle>{LABEL.LOGIN_SUB_TITLE}</LoginSubTitle>
            </TitleWrapper>
            {getFieldView(NAME_ID, name, setName, LABEL.NAME, MSG.HINT_NAME)}
            {getFieldView(NUMBER_ID, number, setNumber, LABEL.NUMBER, MSG.HINT_NUMBER)}
            {getFieldView(BIRTH_ID, birth, setBirth, LABEL.BIRTH, MSG.HINT_BIRTH)}
            <LoginButton
              id={LOGIN_ID}
              variant="contained"
              sx={{
                width: fieldWidth,
                height: 60,
                backgroundImage: `url(${bgBtn})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              disableElevation
              onClick={onLoginClick}
            >
              {LABEL.LOGIN}
            </LoginButton>
            <DonwloadGuideText sx={{ fontSize: downloadTextFontSize }}>{MSG.DOWNLOAD_GUIDE}</DonwloadGuideText>
          </LoginCard>
        </FieldWrapper>
      </Wrapper>
    </>
  );
};

export default LoginView;
