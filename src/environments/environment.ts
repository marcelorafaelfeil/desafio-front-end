// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
	production: false,
	api: {
		guests: {
			list: 'http://www.mocky.io/v2/5aafa6f22d000051006efee5',
			insert: 'http://www.mocky.io/v2/5aafae112d000057006eff19'
		}
	}
};
