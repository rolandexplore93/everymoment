// import { useForm } from 'react-hook-form';
import './Input.scss';

const Input = ({ name, autoFocus, type, onChange, placeholder, value }) => {
  // const { register, handleSubmit, watch, formState: { errors }} = useForm();

  return (
    <input className="input"
        name={name}
        autoFocus={autoFocus}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        inputProps={name === "password" && {
          
        }}
        required
    />
  )
}

export default Input