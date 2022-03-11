import styled from "styled-components";

const S = {
  Container: styled.div`
  font-size: 20pt;
  font-weight: 700;
  padding: 40px;
`,
  Wrapper: styled.div`
    display: flex;
    padding: 20px;
    padding: 40px;
    column-gap: 100px;
  `,
  Left: styled.div`
    width: 50%;
    font-size: 16pt;
    box-shadow: 0 0 4px #000;
    padding: 1%
  `,
  Rigth: styled.div`
    width: 50%;
    box-shadow: 0 0 4px #000;
    padding: 1%
  `,
  Dado: styled.p`
    font-size: 14pt;
    font-weight: 400;
    margin-bottom: 5px;
  `,
  Format: styled.h3``,
  Content: styled.div`
  
  `,
}

export default S
