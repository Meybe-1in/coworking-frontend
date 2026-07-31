import * as Select from "@radix-ui/react-select";
import {
    ChevronDownIcon,
    CheckIcon,
} from "@radix-ui/react-icons";

import "./styles/CustomSelect.css";

export default function CustomSelect({
    value,
    onValueChange,
    options,
}) {
    return (
        <Select.Root
            value={value}
            onValueChange={onValueChange}
        >
            <Select.Trigger className="custom-select-trigger">

                <Select.Value />

                <Select.Icon>
                    <ChevronDownIcon />
                </Select.Icon>

            </Select.Trigger>

            <Select.Portal>

                <Select.Content
                    className="custom-select-content"
                    position="popper"
                >
                    <Select.Viewport>

                        {options.map((item) => (
                            <Select.Item
                                key={item.value}
                                value={item.value}
                                className="custom-select-item"
                            >
                                <Select.ItemText>
                                    {item.label}
                                </Select.ItemText>

                                <Select.ItemIndicator className="custom-select-check">
                                    <CheckIcon />
                                </Select.ItemIndicator>

                            </Select.Item>
                        ))}

                    </Select.Viewport>
                </Select.Content>

            </Select.Portal>

        </Select.Root>
    );
}