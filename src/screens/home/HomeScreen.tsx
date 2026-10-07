import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  ScreenWrapper,
  AppHeader,
  AppText,
  AppLoader,
  ContentCard,
  EmptyState,
  ErrorState,
} from '@/shared/components';
import { useTheme, useToast } from '@/shared/hooks';
import { TRANSLATION_KEYS } from '@/shared/constants';
import { commonStyles, ms } from '@/shared/theme';
import { Post } from '@/store';
import { useHomeFeed } from './hooks/useHomeFeed';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const toast = useToast();
  const { posts, isLoading, isError, isFetching, refetch } = useHomeFeed();

  const handleRefresh = async () => {
    try {
      await refetch().unwrap();
    } catch {
      toast.error(t(TRANSLATION_KEYS.HOME_LOAD_FAILED));
    }
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <ContentCard style={styles.postCard}>
      <AppText variant="h3" style={styles.postTitle}>
        {item.title}
      </AppText>
      <AppText variant="body" color={theme.colors.textSecondary}>
        {item.body}
      </AppText>
    </ContentCard>
  );

  const renderItemSeparator = () => <View style={styles.separator} />;

  const hasPosts = Boolean(posts && posts.length > 0);

  return (
    <ScreenWrapper header={<AppHeader title={t(TRANSLATION_KEYS.HOME_TITLE)} />}>
      {isLoading && !hasPosts ? (
        <View style={commonStyles.centerFlex}>
          <AppLoader size="large" />
        </View>
      ) : isError && !hasPosts ? (
        <View style={styles.errorContainer}>
          <ErrorState
            message={t(TRANSLATION_KEYS.HOME_LOAD_FAILED)}
            onRetry={refetch}
            retryTitle={t(TRANSLATION_KEYS.COMMON_TRY_AGAIN)}
          />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderPostItem}
          contentContainerStyle={styles.listContent}
          refreshing={isFetching}
          onRefresh={handleRefresh}
          ItemSeparatorComponent={renderItemSeparator}
          ListEmptyComponent={
            <EmptyState message={t(TRANSLATION_KEYS.HOME_EMPTY)} />
          }
        />
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: ms(16),
  },
  postCard: {
    marginBottom: 0,
  },
  postTitle: {
    marginBottom: ms(8),
    textTransform: 'capitalize',
  },
  separator: {
    height: ms(12),
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: ms(20),
  },
});
