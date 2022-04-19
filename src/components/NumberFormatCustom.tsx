import React, { forwardRef } from 'react'
import NumberFormat from 'react-number-format'

interface Props {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumberFormatCustom = forwardRef<NumberFormat<any>, Props>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props

      return (
        <NumberFormat
          {...other}
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            })
          }}
          thousandSeparator
          isNumericString
          prefix="₽"
        />
      )
    },
)
