import React, { Component } from "react";
import api from "../../services/api";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductList = styled.div`
  max-width: 700px;
  margin: 20px auto 0;
  padding: 0 20px;
  article {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
    p {
      font-size: 16px;
      color: #999;
      margin-top: 5px;
      line-height: 24px;
    }
    a {
      height: 42px;
      border-radius: 5px;
      border: 2px solid #da552f;
      background: none;
      margin-top: 10px;
      color: #da552f;
      font-weight: bold;
      font-size: 16px;
      text-decoration: none;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      &:hover {
        background: #da552f;
        color: white;
      }
    }
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  button {
    padding: 10px;
    border-radius: 5px;
    border: 0;
    background: #da552f;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      color: #333;
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
      color: white;
    }
  }
`;

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1
  };
  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };
  render() {
    const { products, page, productInfo } = this.state;
    return (
      <>
        <ProductList>
          {products.map(product => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <Link to={`/products/${product._id}`}>Acessar</Link>
            </article>
          ))}
          <Actions>
            <button disabled={page === 1} onClick={this.prevPage}>
              Anterior
            </button>
            <button
              disabled={page === productInfo.pages}
              onClick={this.nextPage}
            >
              Próximo
            </button>
          </Actions>
        </ProductList>
      </>
    );
  }
}
