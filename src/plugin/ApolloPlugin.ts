/**
 * @ author: xxx
 * @ copyright: Copyright (c)
 * @ license: Apache License 2.0
 * @ version: 2020-05-18 11:36:51
 */
import { Plugin, IPlugin, Helper } from "koatty";
import { App } from '../App';
import { PluginApollo } from "think_apollo";

@Plugin()
export class ApolloPlugin implements IPlugin {
    run(options: any, app: App) {
        return PluginApollo(options, app);
    }
}