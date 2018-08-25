package zti.expenses.collections;

import org.springframework.data.jpa.repository.JpaRepository;
import zti.expenses.user.ApplicationUser;

import java.util.List;

public interface CollectionRepository extends JpaRepository<Collection, Long> {

    List<Collection> findCollectionsByOwner(ApplicationUser owner);

}
