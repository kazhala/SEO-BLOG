import { useReducer, useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { create, getTags, removeTag } from '../../actions/tag';

//initial state of the reducer
const initalState = {
  name: '',
  error: false,
  success: false,
  tags: [],
  removed: false,
  reload: false,
};

//reducer of the state
const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.payload,
        error: false,
        success: false,
        removed: false,
      };
    case 'error':
      return {
        ...state,
        error: action.payload,
        success: false,
        removed: false,
      };
    case 'success':
      return {
        ...state,
        error: false,
        success: true,
        name: '',
        removed: false,
        reload: !state.reload,
      };
    case 'tags':
      return { ...state, tags: action.payload };
    case 'removed':
      return {
        ...state,
        error: false,
        success: false,
        name: '',
        removed: true,
        reload: !state.reload,
      };
    case 'clear':
      return { ...state, error: '', success: false, removed: false };
    default:
      return state;
  }
};

const Tag = () => {
  //set up useReducer
  const [tagState, dispatch] = useReducer(reducer, initalState);
  const { name, error, success, tags, removed, reload } = tagState;
  //get user token
  const token = getCookie('token');

  //load new tags when action is fired
  useEffect(() => {
    const loadTags = () => {
      getTags().then(res => {
        console.log(res);
        if (res.error) {
          console.log(res.error);
          dispatch({ type: 'error', payload: res.error });
        } else {
          dispatch({ type: 'tags', payload: res });
        }
      });
    };

    // console.log('re0render');
    loadTags();
  }, [reload]);

  //submit the tag to the DB
  const handleSubmit = e => {
    e.preventDefault();
    // console.log("create category", name);
    create({ name }, token).then(res => {
      // console.log(res);
      if (res.error) {
        dispatch({ type: 'error', payload: res.error });
      } else {
        dispatch({ type: 'success' });
      }
    });
  };

  //change state value of input field
  const handleChange = e => {
    dispatch({ type: 'name', payload: e.target.value });
  };

  //handle delete request
  const deleteTag = slug => {
    // console.log('delete', slug);
    removeTag(slug, token).then(res => {
      if (res.error) {
        dispatch({ type: 'error', payload: res.error });
      } else {
        dispatch({ type: 'removed' });
      }
    });
  };

  //window confirmation of delete
  const deleteConfirm = slug => {
    let answer = window.confirm('Are you sure you want to delete this tag?');
    if (answer) {
      deleteTag(slug);
    }
  };

  //loop and display the tags
  const showTags = () => {
    return tags.map((tag, index) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(tag.slug)}
          title="Double click to delete"
          key={index}
          className="btn btn-outline-primary mr-1 ml-1 mt-3"
        >
          {tag.name}
        </button>
      );
    });
  };

  // tag input form
  const newTagForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          className="form-control"
          type="text"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <p className="text-success">Tag is created</p>;
    }
  };

  const showError = () => {
    if (error) {
      return <p className="text-danger">Tag already exists</p>;
    }
  };

  const showRemoved = () => {
    if (removed) {
      return <p className="text-danger">Tag is removed</p>;
    }
  };

  //clear the detail when mouse move
  const mouseMoveHandler = () => {
    dispatch({ type: 'clear' });
  };

  return (
    <React.Fragment>
      {showSuccess()}
      {showError()}
      {showRemoved()}

      <div onMouseMove={mouseMoveHandler}>
        {newTagForm()}
        {showTags()}
      </div>
    </React.Fragment>
  );
};

export default Tag;
