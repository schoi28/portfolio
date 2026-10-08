---
title: Look up a term
doc_type: 레퍼런스
sidebar_label: 8. Look up a term
---

# Look up a term

The terms and abbreviations used in this document. They are explained for a reader who is comfortable with business tools but new to vehicle software.

Lists of state values and failure codes are in [Browse the reference](./reference.md). This chapter collects **concepts** only.

## Deployment

| Term | Description |
| --- | --- |
| OTA (Over-The-Air) | Updating software wirelessly, without bringing the vehicle into a workshop |
| Package | The bundle of software installed on a vehicle. Its file extension is `.vpk` |
| Campaign | One unit of deploying a single package to a defined set of vehicles |
| Target group | The conditions that define which vehicles a deployment goes to: model, hardware configuration, and current version |
| Compatibility rule | The condition that sets which version can be upgraded to which |
| Rollout | A deployment approach that widens the audience in stages |
| Validation environment (staging) | The environment for trying a campaign against the internal validation fleet |
| Production environment | The environment covering vehicles sold to customers |
| Production deployment | A deployment started in the production environment. It needs approval |
| Rollout stage | One band of the percentage deployed at a time, such as 1% for stage 1 |
| Gate | The criteria that decide whether to advance to the next stage. Defined by success rate and error rate |
| Canary | Deploying to a small number first, before the full deployment, to find problems. Stage 1 is the canary |
| Rollback | Returning deployed software to its previous version |
| Prerequisite package | A package that must be installed before this one. A vehicle that does not meet the condition is not a failure. It moves to a **waiting** state |
| Exclusion list | The list of vehicles not to deploy to even if they match the target group conditions. It takes priority over the conditions |
| Abort | Ending a campaign immediately. **It cannot be resumed** |
| Pause | Stopping only the deployments going to new vehicles. Installations in progress continue |

## Vehicles and installation

| Term | Description |
| --- | --- |
| Precondition | A state the vehicle must be in before an installation can start: parked, battery level, able to communicate |
| Installation window | The range of hours in which an installation may run. Usually set overnight |
| CCU (Central Computing Unit) | The central computer in the vehicle. It is the only point that communicates with the cloud |
| Zonal ECU | A controller responsible for one area of the vehicle. It is what component firmware is deployed to |
| Component firmware | The control software for an individual component, such as the doors or climate control. It takes longer to install than the main software |
| A/B partition | Splitting storage in two, installing to one side, and switching over at the next boot. It allows an immediate return if the installation fails |

## Security and audit

| Term | Description |
| --- | --- |
| Signature verification | The procedure for confirming that a package came from a legitimate publisher and has not been tampered with |
| Uptane | The security framework for vehicle software deployment. It is the international standard for the signing scheme |
| Audit log | The history of who did what and when. **It cannot be edited or deleted** |
| Approval workflow | The procedure that requires sign-off from a responsible person before a deployment |
| Traceability | The property of being able to trace which version was installed on which vehicle, and when |

## Metrics

| Term | Description |
| --- | --- |
| Success rate | The proportion of vehicles that completed, among those that attempted the installation |
| Error rate | The proportion of vehicles that failed, among those that attempted the installation |
| Minimum sample size | The smallest number of vehicles needed before a gate can judge. With fewer, the ratio swings wildly |
| Automatic retry | The system trying again when a failure is classified as temporary |
| Reach rate | The proportion of target vehicles that could actually be contacted |
| Effective failure rate | The overall failure rate **with the precondition and communication codes removed.** It leaves only the failures worth investigating |

## Related documents

- State values and failure codes are in [Browse the reference](./reference.md).
- To do the same work in code, see [VELA Vehicle API: Control OTA deployment](../api/ota.md).
