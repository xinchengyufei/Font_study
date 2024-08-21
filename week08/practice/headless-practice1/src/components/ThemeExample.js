import { Theme, Flex, Text, Button } from '@radix-ui/themes';

export default function ThemeExample() {
  return (
    <Theme>
        <Flex direction="column" gap="2">
            <Text>Hello from Radix Themes :)</Text>
            <Button>Let's go</Button>
        </Flex>
    </Theme>
  );
}