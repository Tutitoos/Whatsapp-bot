import ConfigProps from "../types/Config";

export default class ExtendedConfig implements ConfigProps {
    group_id: string;
    client_id: string;
    prefix: string;
    constructor({ group_id, client_id, prefix }: ConfigProps) {
        this.group_id = group_id;
        this.client_id = client_id;
        this.prefix = prefix;
    }
}
