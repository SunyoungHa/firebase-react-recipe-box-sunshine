import React, { useState, useEffect, Fragment } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  FormControl,
  FormGroup,
  FormLabel,
  Button
} from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

// Accordion style
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function RecipeBox() {
  const classes = useStyles();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [edit, setEdit] = useState(false);
  const handleEdit = () => setEdit(true);
  const handleEditClose = () => setEdit(false);
  const ref = firebase.firestore().collection("Recipes");

  //Add a useState for editedRecipe, this can be initially set to an empty object {id: ""}
  const [editedRecipe, setEditedRecipe] = useState({ id: "" });

  function getRecipes() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setRecipes(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getRecipes();
  }, []);

  function addRecipe(newRecipe) {
    ref
      .doc(newRecipe.id)
      .set(newRecipe)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setIngredients("");
  }

  function deleteRecipe(recipe) {
    ref
      .doc(recipe.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  function handleEditModal(editedObject) {
    console.log(editedObject);
    setLoading();
    setEditedRecipe(editedObject);
    handleEdit();
  }

  function editRecipe(updatedRecipe) {
    setLoading();
    ref
      .doc(updatedRecipe.id)
      .update(updatedRecipe)
      .catch((err) => {
        console.error(err);
      });
    setTitle("");
    setIngredients("");
  }

  return (
    <Fragment>
      <div className="modal">
        <form className="form">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <FormLabel>Recipe Title</FormLabel>
                <FormControl
                  type="text"
                  placeholder="Enter recipe title"
                  // bsSize="lg"
                  style={{ marginBottom: "1rem" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Ingredients</FormLabel>
                <FormControl
                  placeholder="Enter ingredients, separate each with a comma"
                  // bsSize="lg"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button
                onClick={() => {
                  addRecipe({ title, ingredients, id: uuidv4() });
                }}
              >
                {" "}
                Submit
              </Button>

              {loading ? <h1>Loading...</h1> : null}

              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>

      <div className="modal">
        <form className="form">
          <Modal show={edit} onHide={handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <FormLabel>Recipe Title</FormLabel>
                <FormControl
                  type="textarea"
                  placeholder="Enter recipe title"
                  style={{ marginBottom: "1rem" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Ingredients</FormLabel>
                <FormControl
                  // componentClass="text"
                  placeholder="Enter ingredients, separate each with a comma"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <Button
                onClick={() => {
                  editRecipe({ title, ingredients, id: editedRecipe.id });
                }}
              >
                {" "}
                Submit
              </Button>

              {loading ? <h1> Loading</h1> : null}

              <Button variant="secondary" onClick={handleEditClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>

      <hr />
      {loading ? <h1>??????????????????L??????o??????a??????d??????i??????n??????g??????????????????</h1> : null}

      <div className="accordion">
        {recipes.map((recipe) => {
          return (
            <Accordion className="recipe" key={recipe.id}>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {" "}
                  {recipe.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>
                  <li>{recipe.ingredients}</li>
                </Typography>
              </AccordionDetails>

              <Button variant="primary" onClick={() => handleEditModal(recipe)}>
                Edit
              </Button>

              <Button variant="danger" onClick={() => deleteRecipe(recipe)}>
                Delete
              </Button>
            </Accordion>
          );
        })}
      </div>

      <br />
      <Button onClick={handleShow}>Add</Button>
    </Fragment>
  );
}

export default RecipeBox;
