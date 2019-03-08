import React, { Component } from "react";
import api from "../../services/api";
import styled from "styled-components";
import Spinner from "react-spinner-material";

const ProductInfo = styled.div`
  max-width: 700px;
  margin: 20px auto 0;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #ddd;
  h1 {
    font-size: 32px;
  }
  p {
    color: #666;
    line-height: 24px;
    margin-top: 5px;
  }
  a {
    color: #069;
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default class Product extends Component {
  state = {
    product: {},
    loading: true
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/products/${id}`);

    this.setState({ product: response.data, loading: false });
  }
  render() {
    const { product, loading } = this.state;
    return (
      <>
        {loading ? (
          <SpinnerWrapper>
            <Spinner
              size={120}
              spinnerColor={"#da552f"}
              spinnerWidth={2}
              visible={true}
            />
          </SpinnerWrapper>
        ) : (
          <ProductInfo>
            <h1>{product.title}</h1>
            <p>{product.description}</p>

            <p>
              URL:<a href={product.url}>{product.url}</a>
            </p>
          </ProductInfo>
        )}
      </>
    );
  }
}
