import React, { useState } from 'react';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { withStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { withHistory } from 'slate-history';
import { useCreateEditor } from 'slate-plugins';
import { Editable, Slate, withReact } from 'slate-react';
import { initialValuePlainText } from './config/initialValues';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export const PluginsExample = () => {
  const [value, setValue] = useState(initialValuePlainText);

  const editor = useCreateEditor([withReact, withHistory]);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => setValue(newValue)}
      >
        <Editable placeholder="Enter some plain text..." />
      </Slate>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedA}
              onChange={handleChange('checkedA')}
              value="checkedA"
            />
          }
          label="Secondary"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedB}
              onChange={handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
        />
        <FormControlLabel
          control={<Checkbox value="checkedC" />}
          label="Uncontrolled"
        />
        <FormControlLabel
          disabled
          control={<Checkbox value="checkedD" />}
          label="Disabled"
        />
        <FormControlLabel
          disabled
          control={<Checkbox checked value="checkedE" />}
          label="Disabled"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.checkedF}
              onChange={handleChange('checkedF')}
              value="checkedF"
              indeterminate
            />
          }
          label="Indeterminate"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.checkedG}
              onChange={handleChange('checkedG')}
              value="checkedG"
            />
          }
          label="Custom color"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              value="checkedH"
            />
          }
          label="Custom icon"
        />
        <FormControlLabel
          control={
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              value="checkedI"
            />
          }
          label="Custom size"
        />
      </FormGroup>
    </>
  );
};