import { useFormikContext } from 'formik';
import React, { useEffect } from 'react';
import { NewCharacter, SkillChecks, Language } from '../../../types/DBTypes';
import SkillCheckSelectField from '../../../components/inputs/SkillCheckSelectField';
import LanguageSelectField from '../../../components/inputs/LanguageSelectField';
import useLanguages from '../../../hooks/useLanguages';

const knowledgeDomainSkillChoices = ['Arcana', 'History', 'Nature', 'Religion'];

const KnowledgeDomainForm: React.FC = () => {
  const { setFieldValue, values } = useFormikContext<NewCharacter>();
  const { languages } = useLanguages();

  useEffect(() => {
    if (!values.knowledgeDomainSkillProficiencyOne)
      setFieldValue(
        'knowledgeDomainSkillProficiencyOne',
        knowledgeDomainSkillChoices[0]
      );
    if (!values.knowledgeDomainSkillProficiencyTwo)
      setFieldValue(
        'knowledgeDomainSkillProficiencyTwo',
        knowledgeDomainSkillChoices[1]
      );

    if (languages) {
      if (!values.knowledgeDomainLanguageIdOne)
        setFieldValue('knowledgeDomainLanguageIdOne', languages[0]?.id);
      if (!values.knowledgeDomainLanguageIdTwo)
        setFieldValue('knowledgeDomainLanguageIdTwo', languages[1]?.id);
    }
  }, [languages]);

  return (
    <div>
      <h2 className="border p-2">Knowledge Domain</h2>

      <SkillCheckSelectField
        name="knowledgeDomainSkillProficiencyOne"
        filter={(option: SkillChecks) =>
          option !== values.knowledgeDomainSkillProficiencyTwo &&
          knowledgeDomainSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue('knowledgeDomainSkillProficiencyOne', value)
        }
      />
      <SkillCheckSelectField
        name="knowledgeDomainSkillProficiencyTwo"
        filter={(option: SkillChecks) =>
          option !== values.knowledgeDomainSkillProficiencyOne &&
          knowledgeDomainSkillChoices.includes(option)
        }
        label="Select skill proficiency."
        onChange={(value: SkillChecks) =>
          setFieldValue('knowledgeDomainSkillProficiencyTwo', value)
        }
      />

      <LanguageSelectField
        name="knowledgeDomainLanguageIdOne"
        label="Select language proficiency."
        filter={(option: Language) =>
          option.id !== values.knowledgeDomainLanguageIdTwo
        }
        onChange={(value: Language) =>
          setFieldValue('knowledgeDomainLanguageIdOne', value.id)
        }
      />
      <LanguageSelectField
        name="knowledgeDomainLanguageIdTwo"
        label="Select language proficiency."
        filter={(option: Language) =>
          option.id !== values.knowledgeDomainLanguageIdOne
        }
        onChange={(value: Language) =>
          setFieldValue('knowledgeDomainLanguageIdTwo', value.id)
        }
        noDivider={true}
      />
    </div>
  );
};

export default KnowledgeDomainForm;
