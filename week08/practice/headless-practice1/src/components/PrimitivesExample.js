import * as Popover from '@radix-ui/react-popover';
import * as React from 'react';

function PrimitivesExample() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button>Toggle</button>
      </Popover.Trigger>
      <Popover.Content side="bottom" align="center">
        <p>Hello, Radix UI!</p>
      </Popover.Content>
    </Popover.Root>
  );
}

export default PrimitivesExample;