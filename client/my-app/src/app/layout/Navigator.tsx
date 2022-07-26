import { Component } from "react";
import { useNavigate } from "react-router-dom";

export const withRouter = (Component: React.ComponentType<any>) => {
    const WithRouter = (props: any) => {
      const navigate = useNavigate();
      return <Component {...props}  navigate={navigate} />;
    }
    return WithRouter;
  }