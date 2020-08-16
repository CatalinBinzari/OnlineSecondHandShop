import React, { Component } from "react";
import UserLayout from "../../../hoc/user";
import FormField from "../../utils/Form/formField";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateOptionFields,
  populateFields,
} from "../../utils/Form/formActions";
import { connect } from "react-redux";
//import getCategories
//import addProduct from product actions
import {
  addProduct,
  clearProduct,
  getProductById,
  updateProductById,
} from "../../../actions/productAdmin_actions";
import { getCategories } from "../../../actions/category_actions";

import FileUpload from "../../utils/Form/fileupload";

class AddProduct extends Component {
  state = {
    formError: false,
    formSuccess: false,
    formType: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          label: "Product name",
          name: "name_input",
          type: "text",
          placeholder: "Enter your product name",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      description: {
        element: "textarea",
        value: "",
        config: {
          label: "Product description",
          name: "description_input",
          type: "text",
          placeholder: "Enter your description",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      price: {
        element: "input",
        value: "",
        config: {
          label: "Product price",
          name: "price_input",
          type: "number",
          placeholder: "Enter your price",
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      category: {
        element: "select",
        value: "",
        config: {
          label: "Product category",
          name: "category_input",
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      shipping: {
        element: "select",
        value: "",
        config: {
          label: "Shipping",
          name: "shipping_input",
          options: [
            { key: true, value: "Yes" },
            { key: false, value: "No" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      publish: {
        element: "select",
        value: "",
        config: {
          label: "Publish",
          name: "publish_input",
          options: [
            { key: true, value: "Public" },
            { key: false, value: "Hidden" },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
        showlabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: "",
        showlabel: false,
      },
    },
  };
  updateFields = (newFormdata) => {
    this.setState({
      formdata: newFormdata,
    });
  };

  componentDidMount() {
    const productId = this.props.match.params.id;
    const formdata = this.state.formdata;
    this.props.dispatch(getCategories()).then((response) => {
      const newFormdata = populateOptionFields(
        formdata,
        this.props.category.category,
        "category"
      );
      //console.log(this.props.category);
      this.updateFields(newFormdata);
    });

    if (!productId) {
      this.setState({
        formType: "Add product",
      });
    } else {
      this.props.dispatch(getProductById(productId)).then(() => {
        if (!this.props.products.getProductById) return null;

        const newData = this.props.products.getProductById[0];
        console.log(newData);
        const newFormdata = populateFields(this.state.formdata, newData);
        console.log(newFormdata);
        this.setState({
          formType: "Edit product",
          formdata: newFormdata,
        });
        console.log(this.props.formdata);
      });
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, "products");

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  };

  resetFieldsHandler = () => {
    const newFormData = resetFields(this.state.formdata);
    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });
    setTimeout(() => {
      this.setState(
        {
          formSuccess: false,
        },
        () => {
          this.props.dispatch(clearProduct());
        }
      );
    }, 3000);
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "products");
    let formIsValid = isFormValid(this.state.formdata, "products");

    if (formIsValid) {
      if (this.state.formType === "Add product") {
        this.props.dispatch(addProduct(dataToSubmit)).then(() => {
          if (this.props.products.addProduct.success) {
            this.resetFieldsHandler();
          } else {
            this.setState({
              formError: true,
            });
          }
        });
      } else {
        const productId = this.props.match.params.id;
        this.props
          .dispatch(updateProductById(productId, dataToSubmit))
          .then(() => {
            console.log(this.props.products.updateProduct.updated);
            if (this.props.products.updateProduct.success) {
              this.setState({
                formSuccess: true,
              });
            } else {
              this.setState({
                formError: true,
              });
            }
          });
        console.log(dataToSubmit);
      }
    } else {
      this.setState({
        formError: true,
      });
    }
  };

  imagesHandler = (images) => {
    const newFormData = {
      ...this.state.formdata,
    };
    newFormData["images"].value = images;
    newFormData["images"].valid = true;

    this.setState({
      formdata: newFormData,
    });
  };

  // showData = () =>
  //   this.props.products.getProductById
  //     ? this.props.products.getProductById.map((item, i) =>
  //       name=item.name
  //       )

  //     : null;

  render() {
    return (
      <UserLayout>
        <div>
          <h1>{this.state.formType}</h1>
          <form onSubmit={(event) => this.submitForm(event)}>
            <FileUpload
              imagesHandler={(images) => this.imagesHandler(images)}
              reset={this.state.formSuccess}
            />
            <FormField
              id={"name"}
              formdata={this.state.formdata.name}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"description"}
              formdata={this.state.formdata.description}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"price"}
              formdata={this.state.formdata.price}
              change={(element) => this.updateForm(element)}
            />
            <div className="form_devider"></div>
            <FormField
              id={"category"}
              formdata={this.state.formdata.category}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"shipping"}
              formdata={this.state.formdata.shipping}
              change={(element) => this.updateForm(element)}
            />
            <FormField
              id={"publish"}
              formdata={this.state.formdata.publish}
              change={(element) => this.updateForm(element)}
            />

            {this.state.formSuccess ? (
              <div className="form_success">Success</div>
            ) : null}

            <div>
              {this.state.formError ? (
                <div className="error_label">Please check your data</div>
              ) : null}

              <button onClick={(event) => this.submitForm(event)}>
                {this.state.formType}
              </button>
            </div>
          </form>
        </div>
      </UserLayout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.productAdmin,
    category: state.category,
    getProductById: state.getProductById,
    updateProduct: state.updateProduct,
  };
};

export default connect(mapStateToProps)(AddProduct);
