import React from 'react';
import reactDom from 'react-dom';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Verification from './components/Verification';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

configure({adapter: new Adapter()});

it("App renders without crashing", () =>{
  const div = document.createElement("div");
  reactDom.render(<App />, div);
  reactDom.unmountComponentAtNode(div);
});

it("Login button component", () => {
  const wrap = shallow(<Login />);
  expect(wrap.find("button").text()).toEqual("Login");
});

it("Login input component", () => {
  const wrap = shallow(<Login />);
  expect(wrap.find("button").text()).toEqual("Login");
});

it("Register button component", () => {
  const wrap = shallow(<Register />);
  expect(wrap.find("button").text()).toEqual("Register");
});

it("Register input component", () => {
  const wrap = shallow(<Register />);
  expect(wrap.find("input#firstName")).toHaveLength(1);
  expect(wrap.find("input#lastName")).toHaveLength(1);
  expect(wrap.find("input#email")).toHaveLength(1); 
  expect(wrap.find("input#password")).toHaveLength(1);
  expect(wrap.find("input#confirmPassword")).toHaveLength(1);
});

it("Verification button component", () => {
  const wrap = shallow(<Verification />);
  expect(wrap.find("button").text()).toEqual("Verify");
});

it("Verification input component", () => {
  const wrap = shallow(<Verification />);
  expect(wrap.find("input#code")).toHaveLength(1);
});

it("Forgot Password button component", () => {
  const wrap = shallow(<ForgotPassword />);
  expect(wrap.find("button").text()).toEqual("Send Reset Code");
});

it("Forgot Password input component", () => {
  const wrap = shallow(<ForgotPassword />);
  expect(wrap.find("input#email")).toHaveLength(1);
});

it("Reset Password button component", () => {
  const wrap = shallow(<ResetPassword />);
  expect(wrap.find("button").text()).toEqual("Reset");
});

it("Reset Password input component", () => {
  const wrap = shallow(<ResetPassword />);
  expect(wrap.find("input#code")).toHaveLength(1);
  expect(wrap.find("input#password")).toHaveLength(1);
  expect(wrap.find("input#confirmPassword")).toHaveLength(1);
});