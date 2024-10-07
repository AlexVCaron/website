---
title: 'nf-core/tools - 3.0.0'
subtitle: 'What flavour of the nf-core template do you prefer?'
headerImage: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8'
headerImageAlt: 'Yellow and red apples on black plastic crate'
pubDate: 2024-10-03T12:00:00+01:00
authors:
  - 'mirpedrol'
  - 'mashehu'
label:
  - 'tools'
---

# Previously on nf-core/tools

We released nf-core/tools v2.0 in March 2021, which moved the template and tooling to DSL2 and introduced nf-core/modules commands.
In following releases we added subworkflows, switched to using nf-validation for schema validation and removed as much python code as possible from the template.
While this happened the nf-core community grew to now 10,000 slack members including 2,000 active users, who are working on 113 pipelines (compared to 49 when 2.0 was released), 1343 modules and 72 subworkflows.
With this growth we also saw new scientific areas being covered by nf-core pipelines, for example imaging data both on a [micro scale](https://nf-co.re/molkart/) and on a [global scale](https://nf-co.re/rangeland/).
This and the adoption of the nf-core template and tooling even outside the nf-core community, convinced us to make the nf-core template even more flexible and to improve the user experience of the nf-core/tools.

# What's new in nf-core/tools v3.0.0

No worries, this is not as big of a change as the v2.0 release. The main things are:

## ✨ New features

- Enhanced pipeline template customisation: The template has been divided into features that can be selectively included or excluded.
  For example, you can now create a new pipeline without any traces of FastQC.
  You can strip down the pipeline to the bare minimum and add only the tools you need.
  For nf-core pipelines, certain core features (e.g., documentation, CI tests) remain mandatory, but you still have significant customisation flexibility.
- New Text User Interface (TUI) for pipeline creation: A guided interface helps you through the process when running `nf-core pipelines create{:bash}` (don't worry - you can still use the CLI by providing all values as parameters).
- [nf-schema](https://nextflow-io.github.io/nf-schema/latest/) has replaced nf-validation in the pipeline template
- CI tests now use the nf-core tools version matching the pipeline's template version, reducing errors in PRs with each new tools release

## ✨ New features

- Enhanced pipeline template customisation
  The template has been divided into features that can be selectively included or excluded.
  For example, you can now create a new pipeline without any traces of FastQC.
  You can strip down the pipeline to the bare minimum and add only the tools you need.
  For nf-core pipelines, certain core features (e.g., documentation, CI tests) remain mandatory, but you still have significant customisation flexibility.
- New Text User Interface (TUI) for pipeline creation
  A guided interface helps you through the process when running `nf-core pipelines create{:bash}` (don't worry - you can still use the CLI by providing all values as parameters).
- [nf-schema](https://nextflow-io.github.io/nf-schema/latest/) has replaced nf-validation in the pipeline template
- CI tests now use the nf-core tools version matching the pipeline's template version
  This will reduce errors in opened PRs with each new tools release

## ⛓️‍💥 Breaking changes

- All pipeline commands now require the `pipelines` prefix.
  This change makes the commands more consistent with `nf-core modules{:bash}` and `nf-core subworkflows{:bash}` commands.
  The commands which changed are:

  | old command                         | new command                                   |
  | ----------------------------------- | --------------------------------------------- |
  | `nf-core lint{:bash}`               | `nf-core pipelines lint{:bash}`               |
  | `nf-core launch{:bash}`             | `nf-core pipelines launch{:bash}`             |
  | `nf-core download{:bash}`           | `nf-core pipelines download{:bash}`           |
  | `nf-core create-params-file{:bash}` | `nf-core pipelines create-params-file{:bash}` |
  | `nf-core create{:bash}`             | `nf-core pipelines create{:bash}`             |
  | `nf-core lint{:bash}`               | `nf-core pipelines lint{:bash}`               |
  | `nf-core bump-version{:bash}`       | `nf-core pipelines bump-version{:bash}`       |
  | `nf-core sync{:bash}`               | `nf-core pipelines sync{:bash}`               |
  | `nf-core schema build{:bash}`       | `nf-core pipelines schema build{:bash}`       |
  | `nf-core schema docs{:bash}`        | `nf-core pipelines schema docs{:bash}`        |
  | `nf-core schema lint{:bash}`        | `nf-core pipelines schema lint{:bash}`        |
  | `nf-core schema validate{:bash}`    | `nf-core pipelines schema validate{:bash}`    |
  | `nf-core create-logo{:bash}`        | `nf-core pipelines create-logo{:bash}`        |

- Some options have been changed for the `nf-core pipelines download{:bash}` command:
  - The `-t` / `--tower` flag has been renamed to `-p` / `--platform`.
  - We renamed the short flags for consistency, to always use the first letter of the second word in the long flag:
    - The `-d` / `--download-configuration` flag has been renamed to `-c` / `--download-configuration`.
    - The `-p` / `--parallel-downloads` flag has been renamed to `-d` / `--parallel-downloads`.

## 🫡 Deprecations

- The `nf-core licences{:bash}` command is deprecated.

# Tip: Avoiding Merge Conflicts

The v3 release of nf-core/tools includes the ability to have fine-grained control of which template features to include.
You can use this new functionality to switch off chunks of the template.
Doing so means less code will update in the template, and fewer merge conflicts in files that you don't care about.

So - if you don't use any of these template features:

- fastqc
- multiqc
- igenomes
- nf_schema

you can minimize merge conflicts with a quick update and intermediate sync:

1. Start by checking out the `dev` branch:

```bash
git switch dev
```

2. Update the template to the latest version:

```bash
nf-core pipelines sync
```

3. Pull the updated `.nf-core.yml` file from the TEMPLATE branch:

```bash
git checkout TEMPLATE -- .nf-core.yml
```

4. Add the features you want to skip to `skip_features`:

```yaml title=".nf-core.yml"
template:
  skip_features:
    - fastqc
    - igenomes
    - nf_schema
```

5. Commit the changes:

```bash
git add .nf-core.yml
git commit -m "Skip fastqc, igenomes and nf_schema"
```

6. Retrigger the pipeline sync via the [GitHub Actions workflow](https://github.com/nf-core/tools/actions/workflows/sync.yml) using the name of your pipeline as the input.
7. Your template update merge should now have fewer conflicts! 🎉

# Important Template Updates

## The `check_max()` Function Has Been Removed

The `check_max()` function has been replaced by core Nextflow functionality called [`resourceLimits`](https://www.nextflow.io/docs/latest/reference/process.html#resourcelimits).

The `resourceLimits` are specified in the `nextflow.config` file. You can remove all references to `check_max()` and its associated parameters (`max_cpus`, `max_memory`, and `max_time`).
For more information, see the [Nextflow documentation](https://www.nextflow.io/docs/latest/reference/process.html#resourcelimits).

## The nf-validation Plugin Has Been Replaced by nf-schema

The `nf-validation` plugin is deprecated in favour of the new `nf-schema` plugin.

This plugin uses a new JSON schema draft (2020-12), requiring changes to the `nextflow_schema.json` and `assets/schema_input.json` files. Follow the [migration guide](https://nextflow-io.github.io/nf-schema/2.0/migration_guide/) for required changes.

The following validation parameters have been removed from `nextflow.config` and `nextflow_schema.json`:

- validationFailUnrecognisedParams
- validationLenientMode
- validationSchemaIgnoreParams
- validationShowHiddenParams
- validate_params

Instead, use the `validation` scope for `nf-schema` options.

:::note
The plugins definition and `validation` scope have been moved after the `manifest` scope to allow access to `manifest` variables for help message customisation.
:::

The `UTILS_NFVALIDATION_PLUGIN` subworkflow has been replaced by `UTILS_NFSCHEMA_PLUGIN`, changing how the input samplesheet is read. See [the documentation](https://nextflow-io.github.io/nf-schema/2.0/migration_guide/#__tabbed_2_2) for details on using the new `samplesheetToList()` function.

# Removing for-loops and try/catch Blocks from nextflow.config

To prepare for upcoming Nextflow changes, code in config files has been simplified:

- nf-core configs are now included without try/catch blocks
- Include statements have been moved after profile definitions to ensure correct profile overriding
- For more information, see these Nextflow issues: [#1792](https://github.com/nextflow-io/nextflow/issues/1792) and [#5306](https://github.com/nextflow-io/nextflow/issues/5306)

# Common Merge Conflicts and Solutions

## README.md

In the `## Credits` section, you might see conflicts like this:

```diff title="README.md"
<<<<<<< HEAD
- nf-core/mag was written by [Hadrien Gourlé](https://hadriengourle.com) at [SLU](https://slu.se), [Daniel Straub](https://github.com/d4straub) and - [Sabrina Krakau](https://github.com/skrakau) at the [Quantitative Biology Center (QBiC)](http://qbic.life). [James A. Fellows Yates](https://github.- com/jfy133) and [Maxime Borry](https://github.com/maxibor) at the [Max Planck Institute for Evolutionary Anthropology](https://www.eva.mpg.de) joined in version 2.2.0.
-
- Other code contributors include:
-
- - [Antonia Schuster](https://github.com/AntoniaSchuster)
- - [Alexander Ramos](https://github.com/alxndrdiaz)
- - [Carson Miller](https://github.com/CarsonJM)
- - [Daniel Lundin](https://github.com/erikrikarddaniel)
- - [Danielle Callan](https://github.com/d-callan)
- - [Gregory Sprenger](https://github.com/gregorysprenger)
- - [Jim Downie](https://github.com/prototaxites)
- - [Phil Palmer](https://github.com/PhilPalmer)
- - [@willros](https://github.com/willros)
-
- Long read processing was inspired by [caspargross/HybridAssembly](https://github.com/caspargross/HybridAssembly) written by Caspar Gross [@caspargross](https://github.com/caspargross)
- nf-core/mag was written by [Hadrien Gourlé](https://hadriengourle.com) at [SLU](https://slu.se), [Daniel Straub](https://github.com/d4straub) and [Sabrina Krakau](https://github.com/skrakau) at the [Quantitative Biology Center (QBiC)](http://qbic.life).
=======
+ nf-core/mag was originally written by Hadrien Gourlé, Daniel Straub, Sabrina Krakau, James A. Fellows Yates, Maxime Borry.
>>>>>>> TEMPLATE
```

### Resolution

Verify that all authors are included. If confirmed, keep your existing credits section and ignore incoming changes.

## `CITATIONS.md`

Citations you added might have been removed in the template update.

### Resolution

Reject the incoming changes to keep your citations.

## `conf/base.config`

The above mentioned removal of `check_max()` might cause conflicts in the config files

```diff title="conf/base.config"
<<<<<<< HEAD
-    cpus   = { check_max( 1    * task.attempt, 'cpus'   ) }
-    memory = { check_max( 6.GB * task.attempt, 'memory' ) }
-    time   = { check_max( 4.h  * task.attempt, 'time'   ) }
=======
+    // TODO nf-core: Check the defaults for all processes
+    cpus   = { 1      * task.attempt }
+    memory = { 6.GB   * task.attempt }
+    time   = { 4.h    * task.attempt }
>>>>>>> TEMPLATE
```

### Resolution

Double-check the values and accept the incoming changes if correct.

## `.nf-core.yml`

There might be conflicts due to changed order, renamed and new fields, especially in the `template` section.

### Resolution

Double-check the changes for duplicates and accept the incoming changes.

The new file should follow this structure:

```yaml title=".nf-core.yml"
bump_version: null
lint: null
nf_core_version: 3.0.0
org_path: null
template:
  author: Author Name
  description: The description of the pipeline
  force: false
  is_nfcore: true
  name: pipelinename
  org: nf-core
  outdir: .
  skip_features: []
  version: 3.0.0
update: null
```

See the [API docs](/docs/nf-core-tools/api_reference/dev/api/utils#pydantic-modelpythonnf_coreutilsnfcoretemplateconfigpython) for a more detailed description of each field and the allowed input values.

## `nextflow.conifg`

Several merge conflicts to do changes described in [Important Template Updates](http://localhost:4321/blog/2024/tools-3_0_0#important-template-updates).

### Resolution

Double-check in the parameters section, that no pipeline-specific parameter would be removed by the incoming changes. In general, you can accept the incoming changes for this file.

## `subworkflows/local/utils_nfcore_$PIPELINE_NAME_pipeline/main.nf`

The switch to `nf-schema` might cause conflicts in the logic of reading in a samplesheet.

### Resolution

Be careful in accepting incoming changes. The main changes you should do are:

```diff title="subworkflows/local/utils_nfcore_$PIPELINE_NAME_pipeline/main.nf"
- include { fromSamplesheet } from 'plugin/nf-validation'
+ include { samplesheetToList } from 'plugin/nf-schema'
```

```diff title="subworkflows/local/utils_nfcore_$PIPELINE_NAME_pipeline/main.nf"
- Channel.fromSamplesheet("input")
+ Channel.fromList(samplesheetToList(params.input, "path/to/samplesheet/schema"))
```

```diff title="subworkflows/local/utils_nfcore_$PIPELINE_NAME_pipeline/main.nf"
-  UTILS_NFVALIDATION_PLUGIN (
+  UTILS_NFSCHEMA_PLUGIN (
```

See the [nf-schema migration guide](https://nextflow-io.github.io/nf-schema/2.0/migration_guide/) for more details in replacing the `fromSamplesheet` function.
